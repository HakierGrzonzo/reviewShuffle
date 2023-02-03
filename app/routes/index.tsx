import PersonForm from "~/components/personForm";

export default function Index() {
  return (
    <div className="container">
      <h1>Welcome to reviewShuffle</h1>
      <PersonForm formProps={{ action: "/shuffle" }} />
    </div>
  );
}
