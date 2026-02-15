import {
    Box,
    Container,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    useToast,
    Image,
    Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { apiClient } from '../../lib/api';
import LocationPicker from '../../components/LocationPicker';

interface LocationData {
    address: string;
    latitude: number;
    longitude: number;
}

export default function CreateCampaign() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<LocationData | null>(null);
    const [locationError, setLocationError] = useState<string | undefined>(undefined);
    const toast = useToast();
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: any) => {
        if (!imageFile) {
            toast({
                title: 'Image required',
                description: 'Please upload a campaign image',
                status: 'error',
                duration: 3000
            });
            return;
        }

        setLocationError(undefined);

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('title', data.title);
            formData.append('description', data.description);

            const locationName = location?.address?.trim() || 'Location not specified';
            formData.append('location', locationName);

            if (location && location.latitude && location.longitude) {
                formData.append('latitude', location.latitude.toString());
                formData.append('longitude', location.longitude.toString());
            }

            formData.append('targetAmount', data.targetAmount);

            const token = localStorage.getItem('token');
            const response = await apiClient.post('/campaigns', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            toast({
                title: 'Campaign created!',
                description: 'Your campaign has been published successfully',
                status: 'success',
                duration: 3000
            });

            router.push(`/campaigns/${response.data.campaign.id}`);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.error || 'Failed to create campaign',
                status: 'error',
                duration: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="3xl" py={8}>
            <Heading mb={8}>Create a Cleanup Campaign</Heading>

            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Campaign Image</FormLabel>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            p={1}
                        />
                        {imagePreview && (
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                mt={4}
                                maxH="300px"
                                borderRadius="md"
                            />
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.title}>
                        <FormLabel>Campaign Title</FormLabel>
                        <Input
                            {...register('title', { required: true, maxLength: 200 })}
                            placeholder="e.g., Clean up Cubbon Park"
                        />
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            {...register('description', { required: true })}
                            placeholder="Describe the cleanup needed and why it matters..."
                            rows={6}
                        />
                    </FormControl>

                    <LocationPicker
                        value={location || undefined}
                        onChange={(loc) => {
                            setLocation(loc);
                            setLocationError(undefined);
                        }}
                        error={locationError}
                        isRequired={false}
                    />

                    <FormControl isRequired isInvalid={!!errors.targetAmount}>
                        <FormLabel>Target Amount (₹)</FormLabel>
                        <Input
                            type="number"
                            {...register('targetAmount', { required: true, min: 100 })}
                            placeholder="1000"
                        />
                        <Text fontSize="sm" color="gray.600" mt={1}>
                            Minimum: ₹100
                        </Text>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="green"
                        size="lg"
                        isLoading={isLoading}
                    >
                        Create Campaign
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
}
