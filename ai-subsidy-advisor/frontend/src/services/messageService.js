import { getSubsidyAdvice } from './apiService';

export const handleSendMessage = async (input, setMessages, setError, setLoading) => {
  setError(null);
  setLoading(true);

  // Add user's message
  setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);

  // Fetch AI's response
  try {
    const response = await getSubsidyAdvice(input);
    setMessages(prevMessages => [
      ...prevMessages,
      { text: input, sender: 'user' },
      { text: response.advice, sender: 'ai', confidence: response.confidence }
    ]);
  } catch (err) {
    if (err) {
      setError("Er is een fout opgetreden. Probeer het opnieuw.");
    }
  } finally {
    setLoading(false);
  }
};