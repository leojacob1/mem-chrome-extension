/*global chrome*/
import { MemClient } from "@mem-labs/mem-node";
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { CloseIcon } from '@chakra-ui/icons'

function App() {
  const [apiKey, setApiKey] = useState("");
  const [notes, setNotes] = useState("");
  const [memClient, setMemClient] = useState<MemClient | undefined>();
  const [activeTab, setActiveTab] = useState<{title: string | undefined, url: string | undefined} | undefined>();
  const [showPopup, setShowPopup] = useState(false);

  chrome.runtime.onMessage.addListener((message, sender, callback) => {
    console.log('tab message', message)
      if (message.functiontoInvoke === "createMem") {
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
    if (!activeTab || !memClient) return;
    const content = `[${activeTab.title}](${activeTab.url}) 
    ${notes ? `\n\n${notes}` : ''}
    \n\n*Saved from Chrome*
    `;
    memClient.createMem({
      content
    }).then((resp) => {
      console.log(resp);
    });
  }

  const initMem = () => {
    chrome.storage.sync.set({ "memApiKey": apiKey }, () => {
      const newMemClient = new MemClient({
        apiAccessToken: apiKey
      });
      setMemClient(newMemClient);
    });
  }

  const popup = document.getElementById("mem-chrome-app");
  if (!showPopup) {
    console.log('no show');
    if (popup && popup.style) popup.style.display = 'none';
    return <></>
  } else {
    console.log('yes show');
    if (popup && popup.style) popup.style.display = 'block';
  }
  return (
    <Flex p={2} direction='column'>
      <Flex justifyContent='end' p={2}>
        <CloseIcon onClick={() => setShowPopup(false)}/>
      </Flex>
      { memClient ? (
        <>
          <Heading>{activeTab?.title || ''}</Heading>
          <Text>Add your own notes and tags...</Text>
          <Input value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Cool webpage #interesting" 
          />
          <Button onClick={createMem} bgGradient='linear(to-l, #EB2487, #F93939)'>Create Mem</Button>
        </>
      ) : (
        <>
          <Heading>Welcome to Mem</Heading>
          <Text>Add your API Key to get started...</Text>
          <Input value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
            placeholder="YOUR API KEY" 
          />
          <Button onClick={initMem} bgGradient='linear(to-l, #EB2487, #F93939)'>Submit</Button>
        </>
      )}
    </Flex>
  );
  
}

export default App;
