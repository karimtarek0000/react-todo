interface IErrorMessage {
  msg: string;
}

const ErrorMessage = ({ msg }: IErrorMessage) => {
  return msg && <span className="block mt-1 text-red-500">{msg}</span>;
};

export default ErrorMessage;
