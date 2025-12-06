import {
    Box,
    Image,
    Heading,
    Text,
    Progress,
    HStack,
    Badge,
    Avatar
} from '@chakra-ui/react';
import Link from 'next/link';

interface Campaign {
    id: string;
    title: string;
    imageUrl: string;
    location: string;
    latitude?: number;
    longitude?: number;
    targetAmount: number;
    amountRaised: number;
    status: string;
    creator: {
        name: string;
        avatarUrl?: string;
    };
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
    const progress = (campaign.amountRaised / campaign.targetAmount) * 100;

    return (
        <Link href={`/campaigns/${campaign.id}`}>
            <Box
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            >
                <Image
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    h="200px"
                    w="full"
                    objectFit="cover"
                />
                <Box p={4}>
                    <HStack mb={2}>
                        <Badge colorScheme={campaign.status === 'ACTIVE' ? 'green' : 'gray'}>
                            {campaign.status}
                        </Badge>
                    </HStack>
                    <Heading size="md" mb={2} noOfLines={2}>
                        {campaign.title}
                    </Heading>
                    <Text color="gray.600" mb={3} fontSize="sm">
                        📍 {campaign.location}
                    </Text>

                    <Progress value={progress} colorScheme="green" mb={2} />
                    <HStack justify="space-between" mb={3}>
                        <Text fontWeight="bold" color="green.600">
                            ₹{campaign.amountRaised.toLocaleString()}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            of ₹{campaign.targetAmount.toLocaleString()}
                        </Text>
                    </HStack>

                    <HStack>
                        <Avatar size="xs" name={campaign.creator.name} src={campaign.creator.avatarUrl} />
                        <Text fontSize="sm" color="gray.600">
                            by {campaign.creator.name}
                        </Text>
                    </HStack>
                </Box>
            </Box>
        </Link>
    );
}
