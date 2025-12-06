import { useEffect, useRef, useState, useCallback } from 'react';
import {
    Box,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Image,
    Text,
    Spinner,
    VStack
} from '@chakra-ui/react';
import Script from 'next/script';

interface LocationData {
    address: string;
    latitude: number;
    longitude: number;
}

interface LocationPickerProps {
    value?: LocationData;
    onChange: (location: LocationData) => void;
    error?: string;
    isRequired?: boolean;
}

declare global {
    interface Window {
        google: typeof google;
        initGoogleMaps: () => void;
    }
}

export default function LocationPicker({
    value,
    onChange,
    error,
    isRequired = true
}: LocationPickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Generate static map URL
    const getStaticMapUrl = useCallback((lat: number, lng: number) => {
        if (!apiKey) return null;
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&scale=2&markers=color:red%7C${lat},${lng}&key=${apiKey}`;
    }, [apiKey]);

    // Initialize autocomplete when Google Maps is loaded
    const initAutocomplete = useCallback(() => {
        if (!inputRef.current || !window.google || autocompleteRef.current) return;

        try {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                {
                    types: ['geocode', 'establishment'],
                    componentRestrictions: { country: 'in' } // Restrict to India
                }
            );

            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current?.getPlace();
                
                if (place?.geometry?.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    const address = place.formatted_address || place.name || '';

                    onChange({
                        address,
                        latitude: lat,
                        longitude: lng
                    });
                }
            });

            setIsInitialized(true);
        } catch (err) {
            console.error('Failed to initialize Google Places Autocomplete:', err);
        }
    }, [onChange]);

    // Handle script load
    const handleScriptLoad = useCallback(() => {
        setIsLoaded(true);
        initAutocomplete();
    }, [initAutocomplete]);

    // Initialize when component mounts and script is already loaded
    useEffect(() => {
        if (window.google?.maps?.places) {
            setIsLoaded(true);
            initAutocomplete();
        }
    }, [initAutocomplete]);

    // Set up global callback for script load
    useEffect(() => {
        window.initGoogleMaps = handleScriptLoad;
        return () => {
            delete (window as any).initGoogleMaps;
        };
    }, [handleScriptLoad]);

    if (!apiKey) {
        return (
            <FormControl isRequired={isRequired} isInvalid={!!error}>
                <FormLabel>Location</FormLabel>
                <Input
                    placeholder="Enter location (Google Maps not configured)"
                    onChange={(e) => onChange({
                        address: e.target.value,
                        latitude: 0,
                        longitude: 0
                    })}
                />
                <Text fontSize="sm" color="orange.500" mt={1}>
                    Google Maps API key not configured. Location selection is limited.
                </Text>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
        );
    }

    return (
        <>
            {/* Load Google Maps Script */}
            {!isLoaded && (
                <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`}
                    strategy="lazyOnload"
                />
            )}

            <FormControl isRequired={isRequired} isInvalid={!!error}>
                <FormLabel>Location</FormLabel>
                <VStack align="stretch" spacing={3}>
                    <Box position="relative">
                        <Input
                            ref={inputRef}
                            placeholder="Search for a location..."
                            defaultValue={value?.address}
                        />
                        {!isInitialized && isLoaded && (
                            <Box position="absolute" right={3} top="50%" transform="translateY(-50%)">
                                <Spinner size="sm" />
                            </Box>
                        )}
                    </Box>

                    {/* Show static map preview when location is selected */}
                    {value?.latitude && value?.longitude && (
                        <Box borderRadius="md" overflow="hidden" borderWidth={1}>
                            <Image
                                src={getStaticMapUrl(value.latitude, value.longitude) || ''}
                                alt="Selected location"
                                w="full"
                                h="200px"
                                objectFit="cover"
                                fallback={
                                    <Box h="200px" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                                        <Spinner />
                                    </Box>
                                }
                            />
                            <Box p={2} bg="gray.50">
                                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                                    📍 {value.address}
                                </Text>
                                <Text fontSize="xs" color="gray.400">
                                    {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
                                </Text>
                            </Box>
                        </Box>
                    )}

                    {!value?.latitude && (
                        <Text fontSize="sm" color="gray.500">
                            Start typing to search for a location on the map
                        </Text>
                    )}
                </VStack>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
        </>
    );
}
