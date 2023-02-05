import PersonForm from "~/components/personForm";

export default function Index() {
  return (
    <div
      className="container"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <h1>Welcome to Review Shuffle</h1>
      <p className="flow-text">
        Enter the names of your fellow devs, and I will give you a different
        volunteer every two weeks. I will also make sure no one is forced to
        present multiple weeks in a row.
      </p>
      <PersonForm formProps={{ action: "/shuffle" }} />
      <div style={{ flex: 1 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <a href="https://github.com/HakierGrzonzo/reviewShuffle">Source code</a>
        <p>
          Made by{" "}
          <a href="https://grzegorzkoperwas.site/">
            Grzegorz <em>HakierGrzonzo</em> Koperwas
          </a>
        </p>
      </div>
    </div>
  );
}
