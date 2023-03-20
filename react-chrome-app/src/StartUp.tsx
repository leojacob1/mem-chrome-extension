import { Input, Text, VStack } from "@chakra-ui/react";

const StartUp = ({ apiKey, setApiKey}: {apiKey: string, setApiKey: React.Dispatch<React.SetStateAction<string>>}) => (
  <VStack alignSelf="start" spacing={1} height="100%" width="100%">
    <Text alignSelf="start" as='b'>Welcome to Mem</Text>
    <Text alignSelf="start">Add your API Key to get started...</Text>
    <Input value={apiKey} 
      onChange={(e) => setApiKey(e.target.value)} 
      placeholder="YOUR API KEY" 
      alignSelf="start"
    />
  </VStack>
);

export default StartUp;