import Header from "../components/Header/Header";

export default function ClientWrapper({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
