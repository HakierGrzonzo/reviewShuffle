import { json, LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { formatISO9075 } from "date-fns";
import { useState } from "react";
import PersonForm from "~/components/personForm";
import { generateRandomSequence, getReviewYTD } from "~/utils";

export const loader: LoaderFunction = ({ request, context }) => {
  const url = new URL(request.url);
  const names = [...url.searchParams.entries()]
    .filter(([name, _]) => {
      return name.startsWith("name-");
    })
    .sort(([a, _a], [b, _b]) => {
      const [a_num, b_num] = [a, b].map((key) => {
        const [_, number] = key.split("-");
        return parseInt(number);
      });
      return a_num - b_num;
    })
    .map(([_, name]) => name)
    .sort((a, b) => a.localeCompare(b));
  const reviewIndex = getReviewYTD();
  const sequence = generateRandomSequence(names, reviewIndex, context.SEED);
  return json({ reviewIndex, person: sequence.at(-1), names });
};

export const meta: MetaFunction = ({ data }) => {
  const today = new Date();
  return {
    title: `It is ${data.person}`,
    "og:title": "Review Shuffle",
    description: `For ${formatISO9075(today, {
      representation: "date",
    })}, the winner is ${data.person}. Have a great review presentation!`,
  };
};

export default function Shuffle() {
  const { person, reviewIndex, names } = useLoaderData();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  return (
    <div
      className="container"
      style={{ display: "flex", height: "100vh", flexDirection: "column" }}
    >
      <h1>And the winner of the review no. {reviewIndex} is!</h1>
      <div className="valign-wrapper" style={{ flex: 1 }}>
        <h2 className="center-align" style={{ flex: 1 }}>
          {person}
        </h2>
      </div>
      <a
        className="waves-effect waves-light btn"
        onClick={() => setShowEdit(!showEdit)}
      >
        {showEdit ? "Hide editor" : "I forgot about someone!"}
      </a>
      {showEdit && (
        <div style={{ maxHeight: "50vh", overflowX: "auto", padding: "1mm" }}>
          <PersonForm initialNames={names} formProps={{ action: "." }} />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <p>I hope you will have a good time today!</p>
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}
