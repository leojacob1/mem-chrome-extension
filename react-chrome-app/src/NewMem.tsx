import { Text, Textarea, VStack } from "@chakra-ui/react";

const NewMem = ({ content, disabled, setDisabled, setContent}: {content: {text: string, url: string}, disabled: boolean, setDisabled: React.Dispatch<React.SetStateAction<boolean>>, setContent: React.Dispatch<React.SetStateAction<{text: string, url: string}>>}) => (
  <VStack alignSelf="start" spacing={1} height="100%" width="100%">
    <Text alignSelf="start" as='b'>New Mem</Text>
    <Textarea value={content.text} 
      onChange={(e) => {
        if (disabled) setDisabled(false);
        setContent((prev) => ({...prev, text: e.target.value}))
      }}
      placeholder="Cool webpage #interesting" 
      fontSize="xs"
      flex="1"
    />
  </VStack>
);

export default NewMem;