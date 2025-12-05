import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { apiClient } from '../../lib/api';

interface ContributeModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaign: any;
}

export default function ContributeModal({ isOpen, onClose, campaign }: ContributeModalProps) {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleContribute = async () => {
        if (!amount || parseFloat(amount) < 10) {
            toast({
                title: 'Invalid amount',
                description: 'Minimum contribution is ₹10',
                status: 'error',
                duration: 3000
            });
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');

            // Create order
            const orderResponse = await apiClient.post(
                '/contributions/create-order',
                {
                    campaignId: campaign.id,
                    amount: parseFloat(amount)
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const { orderId, keyId } = orderResponse.data;

            // Initialize Razorpay
            const options = {
                key: keyId,
                amount: parseFloat(amount) * 100,
                currency: 'INR',
                name: 'Cleanit',
                description: `Contribution to ${campaign.title}`,
                order_id: orderId,
                handler: async function (response: any) {
                    try {
                        // Verify payment
                        await apiClient.post(
                            '/contributions/verify',
                            {
                                orderId: response.razorpay_order_id,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                                campaignId: campaign.id,
                                amount: parseFloat(amount)
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` }
                            }
                        );

                        toast({
                            title: 'Contribution successful!',
                            description: 'Thank you for supporting this campaign',
                            status: 'success',
                            duration: 3000
                        });

                        onClose();
                        window.location.reload();
                    } catch (error) {
                        toast({
                            title: 'Payment verification failed',
                            status: 'error',
                            duration: 3000
                        });
                    }
                },
                prefill: {
                    name: '',
                    email: ''
                }
            };

            // @ts-ignore
            const rzp = new window.Razorpay(options);

            // Close our modal first so Razorpay can receive focus
            onClose();

            rzp.open();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.error || 'Failed to process payment',
                status: 'error',
                duration: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Contribute to Campaign</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack spacing={4}>
                        <Text>
                            Help clean {campaign.location} by contributing to this campaign
                        </Text>
                        <FormControl>
                            <FormLabel>Amount (₹)</FormLabel>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                min={10}
                            />
                            <Text fontSize="sm" color="gray.600" mt={1}>
                                Minimum: ₹10
                            </Text>
                        </FormControl>
                        <Button
                            colorScheme="green"
                            width="full"
                            onClick={handleContribute}
                            isLoading={isLoading}
                        >
                            Contribute ₹{amount || '0'}
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
