import { getSubsidyAdvice } from './apiService';

export const handleSendMessage = async (input, setMessages, setError, setLoading) => {
  setError(null);
  setLoading(true);

  // Add user message to chat
  setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);

  try {
    // Add a placeholder message for AI typing
    setMessages(prevMessages => [
      ...prevMessages,
      { text: '', sender: 'ai', typing: true }
    ]);

    // Fetch AI response
    const response = await getSubsidyAdvice(input);
    const fullResponse = response.advice;

    // Simulate typing effect
    const typingDelay = 100;
    const words = fullResponse.split(' ');
    let currentWordIndex = 0;

    const typeOutWords = () => {
      if (currentWordIndex < words.length) {
        const currentText = words.slice(0, currentWordIndex + 1).join(' ');
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          { text: currentText, sender: 'ai', confidence: response.confidence, typing: true }
        ]);
        currentWordIndex++;
        setTimeout(typeOutWords, typingDelay);
      } else {
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          { text: fullResponse, sender: 'ai', confidence: response.confidence, typing: false }
        ]);
      }
    };

    typeOutWords();

  } catch (err) {
    setError("Er is een fout opgetreden. Probeer het opnieuw.");
    setMessages(prevMessages => [
      ...prevMessages.slice(0, -1),
    ]);
  } finally {
    setLoading(false);
  }
};

export const fetchChatHistory = async () => {
  const response = await fetch('http://localhost:8000/chat-history');
  if (!response.ok) {
    throw new Error('Failed to fetch chat history');
  }
  return response.json();
};