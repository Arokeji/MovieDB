import { customTestingRender } from "../../utils/test-utils";
import HeaderBar from "./HeaderBar";

describe("Header component", () => {
  test("Check that header renders the logo", () => {
    const { container } = customTestingRender(<HeaderBar logo={"test"}></HeaderBar>);
    const headerElement = container.querySelector(".header");
    expect(headerElement).toHaveClass("header__logo");
  });
});
