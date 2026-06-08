import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NdaForm from "./NdaForm";
import { EMPTY_FORM } from "../../types";
import type { NdaFormData } from "../../types";

const noop = () => {};

describe("NdaForm", () => {
  describe("rendering", () => {
    beforeEach(() => render(<NdaForm data={EMPTY_FORM} onChange={noop} />));

    it("renders the app title", () => {
      expect(screen.getByText("Mutual NDA Creator")).toBeInTheDocument();
    });

    it("renders Party 1 section", () => {
      expect(screen.getByText(/Party 1/i)).toBeInTheDocument();
    });

    it("renders Party 2 section", () => {
      expect(screen.getByText(/Party 2/i)).toBeInTheDocument();
    });

    it("renders Agreement Details section", () => {
      expect(screen.getByText(/Agreement Details/i)).toBeInTheDocument();
    });

    it("renders the download button", () => {
      expect(screen.getByRole("button", { name: /download as pdf/i })).toBeInTheDocument();
    });

    it("renders an effective date input of type date", () => {
      const dateInput = document.querySelector('input[type="date"]');
      expect(dateInput).toBeInTheDocument();
    });
  });

  describe("controlled inputs reflect current data", () => {
    it("shows current party1Name value", () => {
      const data: NdaFormData = { ...EMPTY_FORM, party1Name: "Acme Corp" };
      render(<NdaForm data={data} onChange={noop} />);
      const inputs = screen.getAllByDisplayValue("Acme Corp");
      expect(inputs.length).toBe(1);
    });

    it("shows current party2Name value", () => {
      const data: NdaFormData = { ...EMPTY_FORM, party2Name: "Beta Inc." };
      render(<NdaForm data={data} onChange={noop} />);
      expect(screen.getByDisplayValue("Beta Inc.")).toBeInTheDocument();
    });

    it("shows current purpose value in textarea", () => {
      const data: NdaFormData = { ...EMPTY_FORM, purpose: "Exploring a partnership." };
      render(<NdaForm data={data} onChange={noop} />);
      expect(screen.getByDisplayValue("Exploring a partnership.")).toBeInTheDocument();
    });
  });

  describe("onChange callback", () => {
    it("calls onChange with updated party1Name when user types", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<NdaForm data={EMPTY_FORM} onChange={handleChange} />);

      const input = screen.getByPlaceholderText("Acme Corporation");
      await user.type(input, "X");

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ party1Name: "X" })
      );
    });

    it("calls onChange with updated party2Name when user types", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<NdaForm data={EMPTY_FORM} onChange={handleChange} />);

      const input = screen.getByPlaceholderText("Beta Inc.");
      await user.type(input, "Y");

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ party2Name: "Y" })
      );
    });

    it("calls onChange with updated purpose when user types in textarea", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<NdaForm data={EMPTY_FORM} onChange={handleChange} />);

      const textarea = screen.getByPlaceholderText(/Evaluating a potential/i);
      await user.type(textarea, "P");

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ purpose: "P" })
      );
    });

    it("preserves all other fields when one field changes", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const data: NdaFormData = { ...EMPTY_FORM, party2Name: "Beta Inc.", governingState: "Delaware" };
      render(<NdaForm data={data} onChange={handleChange} />);

      const input = screen.getByPlaceholderText("Acme Corporation");
      await user.type(input, "A");

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ party2Name: "Beta Inc.", governingState: "Delaware" })
      );
    });
  });

  describe("download button", () => {
    it("calls window.print when download button is clicked", async () => {
      const user = userEvent.setup();
      const printMock = jest.fn();
      window.print = printMock;

      render(<NdaForm data={EMPTY_FORM} onChange={noop} />);
      await user.click(screen.getByRole("button", { name: /download as pdf/i }));

      expect(printMock).toHaveBeenCalledTimes(1);
    });
  });
});
