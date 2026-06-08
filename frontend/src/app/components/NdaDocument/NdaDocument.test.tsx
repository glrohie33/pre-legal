import { render, screen } from "@testing-library/react";
import NdaDocument from "./NdaDocument";
import { EMPTY_FORM } from "../../types";
import type { NdaFormData } from "../../types";

const filled: NdaFormData = {
  party1Name: "Acme Corporation",
  party1Address: "123 Main St",
  party1City: "New York",
  party1State: "NY",
  party1Zip: "10001",
  party2Name: "Beta Inc.",
  party2Address: "456 Oak Ave",
  party2City: "Los Angeles",
  party2State: "CA",
  party2Zip: "90001",
  effectiveDate: "2026-01-15",
  purpose: "Evaluating a potential partnership.",
  duration: "2 years",
  governingState: "Delaware",
};

describe("NdaDocument", () => {
  describe("with empty form", () => {
    beforeEach(() => render(<NdaDocument data={EMPTY_FORM} />));

    it("renders the document title", () => {
      expect(screen.getByText("Mutual Non-Disclosure Agreement")).toBeInTheDocument();
    });

    it("shows placeholder for party 1 name", () => {
      // appears in parties intro and signature block
      expect(screen.getAllByText("[Party 1 Name]").length).toBeGreaterThanOrEqual(1);
    });

    it("shows placeholder for party 2 name", () => {
      expect(screen.getAllByText("[Party 2 Name]").length).toBeGreaterThanOrEqual(1);
    });

    it("shows placeholder for effective date", () => {
      expect(screen.getByText("[Effective Date]")).toBeInTheDocument();
    });

    it("shows placeholder for purpose", () => {
      expect(screen.getByText("[describe the purpose of disclosure]")).toBeInTheDocument();
    });

    it("shows placeholder for duration", () => {
      // Duration placeholder appears twice (Term section uses it twice)
      const placeholders = screen.getAllByText("[e.g. 2 years]");
      expect(placeholders.length).toBeGreaterThanOrEqual(1);
    });

    it("shows placeholder for governing state", () => {
      expect(screen.getByText("[Governing State]")).toBeInTheDocument();
    });
  });

  describe("with filled form", () => {
    beforeEach(() => render(<NdaDocument data={filled} />));

    it("renders party 1 name", () => {
      expect(screen.getAllByText("Acme Corporation").length).toBeGreaterThanOrEqual(1);
    });

    it("renders party 2 name", () => {
      expect(screen.getAllByText("Beta Inc.").length).toBeGreaterThanOrEqual(1);
    });

    it("renders party 1 address", () => {
      expect(screen.getByText("123 Main St, New York, NY 10001")).toBeInTheDocument();
    });

    it("renders party 2 address", () => {
      expect(screen.getByText("456 Oak Ave, Los Angeles, CA 90001")).toBeInTheDocument();
    });

    it("renders effective date in long format", () => {
      expect(screen.getByText("January 15, 2026")).toBeInTheDocument();
    });

    it("renders purpose text", () => {
      expect(screen.getByText("Evaluating a potential partnership.")).toBeInTheDocument();
    });

    it("renders duration", () => {
      const durations = screen.getAllByText("2 years");
      expect(durations.length).toBeGreaterThanOrEqual(1);
    });

    it("renders governing state", () => {
      expect(screen.getByText("Delaware")).toBeInTheDocument();
    });

    it("does not show empty placeholders when all fields are filled", () => {
      expect(screen.queryAllByText("[Party 1 Name]")).toHaveLength(0);
      expect(screen.queryAllByText("[Party 2 Name]")).toHaveLength(0);
      expect(screen.queryByText("[Effective Date]")).not.toBeInTheDocument();
      expect(screen.queryByText("[Governing State]")).not.toBeInTheDocument();
    });
  });

  describe("partial form", () => {
    it("shows party 1 name and placeholder for party 2", () => {
      render(<NdaDocument data={{ ...EMPTY_FORM, party1Name: "Solo Corp" }} />);
      expect(screen.getAllByText("Solo Corp").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("[Party 2 Name]").length).toBeGreaterThanOrEqual(1);
    });

    it("omits address phrase when address fields are empty", () => {
      render(<NdaDocument data={{ ...EMPTY_FORM, party1Name: "Solo Corp" }} />);
      expect(screen.queryByText(/located at/)).not.toBeInTheDocument();
    });

    it("shows address phrase when address fields are filled", () => {
      render(
        <NdaDocument
          data={{
            ...EMPTY_FORM,
            party1Name: "Solo Corp",
            party1Address: "1 Test Rd",
            party1City: "Boston",
            party1State: "MA",
            party1Zip: "02101",
          }}
        />
      );
      expect(screen.getByText(/located at/)).toBeInTheDocument();
    });
  });
});
