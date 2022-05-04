export default function InputField({ fieldInfo, state }) {
  const { label, placeholder, inputId, type } = fieldInfo;
  const [value, setValue] = state;

  return (
    <label htmlFor={inputId} className="input-label">
      {label}:
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="input-field"
        required={true}
      />
    </label>
  );
}
