/*global chrome*/
import { MemClient } from "@mem-labs/mem-node";
import { Button, Heading, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from "react";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [notes, setNotes] = useState("");
  const [memClient, setMemClient] = useState<MemClient | undefined>();
  const [activeTab, setActiveTab] = useState<{title: string | undefined, url: string | undefined} | undefined>();

  useEffect(() => {
    chrome.storage.sync.get("memApiKey", function(items){
      if (items.memApiKey) {
        const memClient = new MemClient({
          apiAccessToken: items.memApiKey
        });
        setMemClient(memClient);
        chrome.tabs.query({active: true}, function(tabs){
          if (tabs.length) {
            const { title, url } = tabs[0];
            setActiveTab({ title, url });
          }
      });
      }
    });
  }, [])

  useEffect(() => {
    chrome.runtime.sendMessage(
      "Mem client initialized"
    )
  }, [memClient])

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
      console.log('2', memClient)
      setMemClient(newMemClient);
    });

  }
  return (
    <div>
      <header>
        { memClient ? 
        <>
        <Heading>{activeTab?.title || ''}</Heading>
        <Text>Add your own notes and tags...</Text>
        <Input value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Cool webpage #interesting" 
        />
        <Button onClick={createMem}>Create Mem</Button>
        </>
        : 
        <>
        <Heading>Welcome to Mem</Heading>
        <Text>Add your API Key to get started...</Text>
        <Input value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
          placeholder="YOUR API KEY" 
        />
        <Button onClick={initMem}>Submit</Button>
        </>
        }
      </header>
    </div>
  );
}

export default App;
