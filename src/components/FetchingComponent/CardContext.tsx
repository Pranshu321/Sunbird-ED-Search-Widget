import { createContext } from "react";

const CardContext = createContext({
    name: "",
    image: "",
    subject: "",
    type: "",
    publisher: "",
    tags: [""],
});

export default CardContext;