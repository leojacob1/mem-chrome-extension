/*global chrome*/
import { MemClient } from "@mem-labs/mem-node";
import { Box, Button, Flex, Heading, Input, Text, Textarea, VStack } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { CloseIcon } from '@chakra-ui/icons'
import NewMem from "./NewMem";
import StartUp from "./StartUp";
import Tutorial from "./Tutorial";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [content, setContent] = useState<{text: string, url: string}>({text: "", url: ""});
  const [memClient, setMemClient] = useState<MemClient | undefined>();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [error, setError] = useState('');

  chrome.runtime.onMessage.addListener((message, sender, callback) => {
    console.log('tab message', message)
      if (message.functiontoInvoke === 'createMem' || message.functiontoInvoke === 'pageOpen') {
        const text = `${message.title}\n\nAdd notes and tags...`;
        setContent({text, url: message.url});
        setShowTutorial(false);
        setDisabled(false);
        setShowPopup(true);
      }
  });

  useEffect(() => {
    chrome.storage.sync.get("memApiKey", function(items){
      if (items.memApiKey) {
        const memClient = new MemClient({
          apiAccessToken: items.memApiKey
        });
        setMemClient(memClient);
      } else {
        setShowPopup(true);
      }
    });
  }, [])

  const createMem = () => {
    setLoading(true);
    if (!content || !memClient) return;
    const fullText = content.text + `\n\n[See webpage](${content.url})\n*Saved from Chrome*`
    memClient.createMem({
      content: fullText
    }).then((resp) => {
      console.log('new mem', resp);
      setError('');
      setDisabled(true);
      setLoading(false);
    }).catch(() => {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    });
  }

  const initMem = () => {
    setLoading(true);
    const newMemClient = new MemClient({
      apiAccessToken: apiKey
    });
    newMemClient.healthCheck().then(() => {
      chrome.storage.sync.set({ "memApiKey": apiKey }, () => {
        setError('');
        setShowTutorial(true);
        setMemClient(newMemClient);
        setLoading(false);
      });
    }).catch((err) => {
      setError("Something went wrong. Please check your API key and try again.");
      setLoading(false);
      return;
    })
  }

  const popup = document.getElementById("mem-chrome-app");
  if (!showPopup) {
    if (popup && popup.style) popup.style.display = 'none';
    return <></>
  } else {
    if (popup && popup.style) popup.style.display = 'block';
  }

  let button = <></>;
  let pageContent = <></>;
  if (showTutorial) {
    pageContent = <Tutorial />
  } else if(disabled) {
    pageContent = <NewMem content={content} disabled={disabled} setDisabled={setDisabled} setContent={setContent} />;
    button = (<Button width="100%" m={1} isDisabled>Mem created</Button>);
  } else if (memClient) {
    pageContent = <NewMem content={content} disabled={disabled} setDisabled={setDisabled} setContent={setContent} />;
    button = (<Button width="100%" m={1} onClick={createMem} isLoading={loading} bgGradient='linear(to-l, #EB2487, #F93939)'>
      Create Mem
    </Button>);
  } else {
    pageContent = <StartUp apiKey={apiKey} setApiKey={setApiKey} />;
    button = (<Button width="100%" m={1} onClick={initMem} isLoading={loading} bgGradient='linear(to-l, #EB2487, #F93939)'>
      Submit
    </Button>);
  }

  return (
    <VStack p={2} spacing={1} height="600px">
      <Flex justifyContent='end' p={2} alignSelf='end'>
        <CloseIcon onClick={() => setShowPopup(false)}/>
      </Flex>
      {error ? <Text color='red'>{error}</Text> : null}
      {pageContent}
      {button}
    </VStack>
  );
  
}

export default App;
