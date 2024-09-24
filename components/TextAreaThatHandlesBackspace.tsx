
const TextAreaThatHandlesBackspace = () => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === 'Backspace') {
      console.log('Backspace key pressed');
    }
  };

  return (
    <textarea className="p-4 bg-gray-100 rounded-lg" onKeyDown={handleKeyDown} />
  );
};

export default TextAreaThatHandlesBackspace;
