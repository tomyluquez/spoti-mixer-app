import React, { useState, useEffect } from "react";

interface SimpleInputProps {
  htmlFor: string; // htmlFor en lugar de for, ya que for es una palabra reservada en JavaScript
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  isSubmitted?: boolean;
}

const SimpleInput = ({
  htmlFor,
  label,
  placeholder,
  onChange,
  isSubmitted,
}: SimpleInputProps) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isSubmitted) {
      setInputValue("");
    }
  }, [isSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        placeholder={placeholder}
        className="block mt-2 w-full placeholder-sgray rounded-lg border border-sgray bg-sblack px-5 py-2.5 text-sgray focus:border-sgreen-light focus:outline-none focus:ring focus:ring-sgreen-light focus:ring-opacity-40"
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};

export default SimpleInput;
