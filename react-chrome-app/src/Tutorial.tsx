import { Text, VStack } from "@chakra-ui/react";

const Tutorial = () => (
  <VStack alignSelf="start" spacing={1} height="100%" width="100%">
    <Text alignSelf="start" as='b'>Woohoo!</Text>
    <Text alignSelf="start">You&apos;re all set. Right click anywhere on the web to make a Mem.</Text>
  </VStack>
);

export default Tutorial;