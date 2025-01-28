import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Landing from "./Landing";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

describe("Landing Component", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <Landing />
          </I18nextProvider>
        </BrowserRouter>
      </RecoilRoot>
    );
  });

  it("should render the landing page without crashing", async () => {
    const elements = await screen.findAllByText(/انتخاب واحد/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it("should display the main slider text", () => {
    expect(
      screen.getByText(/انتخاب واحد، آسان‌تر از همیشه/i)
    ).toBeInTheDocument();
  });

  it("should render all services", () => {
    const services = screen.getAllByText(/ویژگی های سامانه انتخاب واحد/i);
    expect(services.length).toBeGreaterThan(0);
  });

  it("should display the about us section", () => {
    expect(screen.getByText(/درباره ما/i)).toBeInTheDocument();
  });

  it("should display client reviews", () => {
    expect(screen.getByText(/نظر دانشجویان/i)).toBeInTheDocument();
  });
});
