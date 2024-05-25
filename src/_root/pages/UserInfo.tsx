import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { Loader } from "@/components/shared";

const UserInfo = () => {
  const { userId } = useParams<{ userId: string }>();
  const { loanId } = useParams<{ loanId: string }>();
  const token = localStorage.getItem("authToken");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loanInstallmentAmt, setLoanInstallmentAmt] = useState(0);
  const [value, setValue] = useState(0);
  const [disabledMinus, setDisabledMinus] = useState(false);
  const [disabledPlus, setDisabledPlus] = useState(false);
  const [loanData, setLoanData] = useState<{
    name?: string;
    loan_acc_num?: string;
    pending_installment_num?: number;
  } | null>(null);
  const [qrCode, setQrCode] = useState("");
  const [loadingInstallment, setLoadingInstallment] = useState(false);
  const [loadingNotice, setLoadingNotice] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_LOAN_DETAILS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            query_type: "user_all_loan",
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const res = await response.json();
        console.log(res);
        var data;
        for (var x of res.response) {
          if (x.loan_id == loanId) {
            data = x;
            break;
          }
        }
        data.name = data.fname;
        if (data.mname) {
          data.name += " " + data.mname;
        }
        if (data.lname) {
          data.name += " " + data.lname;
        }
        console.log(data);
        setLoanInstallmentAmt(data.loan_installment_amt);
        setValue(data.loan_installment_amt);
        setDisabledMinus(true);
        setDisabledPlus(false);
        setLoanData(data); // Store the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  const onClick = (adjustment: number) => {
    const newValue = value + adjustment;
    setValue(newValue);
    setDisabledMinus(newValue <= loanInstallmentAmt);
    if (loanData) {
      setDisabledPlus(
        newValue >= (loanData.pending_installment_num || 0) * loanInstallmentAmt
      );
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerOpenChange = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
    if (!isOpen) {
      setQrCode("");
      setLoadingInstallment(false);
    }
  };

  const handleNoticeDownload = async () => {
    setLoadingNotice(true); // Start loading
    try {
      const generateResponse = await fetch(
        import.meta.env.VITE_GENERATE_LETTER_NOTICE,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            doc_type: "notice",
            user_id: userId,
            loan_id: loanId,
          }),
        }
      );

      if (!generateResponse.ok) {
        throw new Error(`Error: ${generateResponse.statusText}`);
      }

      const getUserDocumentUrlResponse = await fetch(
        import.meta.env.VITE_GET_USER_DOCUMENT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            all_images: true,
            user_id: userId,
            loan_id: loanId,
          }),
        }
      );

      if (!getUserDocumentUrlResponse.ok) {
        throw new Error(`Error: ${getUserDocumentUrlResponse.statusText}`);
      }

      const res = await getUserDocumentUrlResponse.json();
      var notice_url = res.url.notice;
      const link = document.createElement("a");
      link.href = notice_url;
      link.download = "notice.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoadingNotice(false); // End loading
  };

  const handleGenerate = async () => {
    console.log("Updated Amount:", value);
    setLoadingGenerate(true); // Start loading
    try {
      const response = await fetch(import.meta.env.VITE_GENERATE_QR, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          loan_id: loanId,
          amount: Number(value),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setQrCode(data.response.dynamic_qr); // Set the QR code state
    } catch (error) {
      console.error("Error generating QR:", error);
    }
    setLoadingGenerate(false); // End loading
  };

  return (
    <>
      <div className="container">
        <section>
          <div className="text-center my-5 text-xl">
            <h2 className="py-2">
              Name: {loanData ? loanData.name : "Loading..."}
            </h2>
            <h2 className="py-2">
              Loan Account no.:{" "}
              {loanData ? loanData.loan_acc_num : "Loading..."}
            </h2>
          </div>
        </section>
        <section className="my-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="pay-installments">
              <AccordionTrigger>Pay Installments</AccordionTrigger>
              <AccordionContent>
                <Button
                  type="submit"
                  className="shad-button_primary w-full"
                  onClick={() => toggleDrawer()}
                  disabled={loadingInstallment}>
                  {loadingInstallment ? (
                    <div className="flex-center gap-2">
                      <Loader /> Please Wait...
                    </div>
                  ) : (
                    "Pay Installments"
                  )}
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pay-charges">
              <AccordionTrigger>Pay Charges</AccordionTrigger>
              <AccordionContent>
                <Button
                  type="submit"
                  className="shad-button_primary w-full"
                  disabled
                  onClick={() => console.log("Pay the charge")}>
                  Pay Charges
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="download-notice">
              <AccordionTrigger>Download Notice</AccordionTrigger>
              <AccordionContent>
                <Button
                  type="submit"
                  className="shad-button_primary w-full"
                  onClick={handleNoticeDownload}
                  disabled={loadingNotice}>
                  {loadingNotice ? (
                    <div className="flex-center gap-2">
                      <Loader /> Downloading...
                    </div>
                  ) : (
                    "Download"
                  )}
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Drawer open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
            <DrawerContent className="bg-dark-2 text-white">
              <DrawerHeader>
                <DrawerTitle>Generate Payment QR</DrawerTitle>
                {qrCode && (
                  <div className="text-center mt-4 mx-auto">
                    <img
                      src={`data:image/png;base64,${qrCode}`}
                      alt="QR Code"
                    />
                  </div>
                )}
                <DrawerDescription>
                  Change installment Amount.
                </DrawerDescription>
              </DrawerHeader>

              <div className="mx-auto w-full max-w-sm">
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="icon"
                      className="shad-button_primary h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(-loanInstallmentAmt)}
                      disabled={disabledMinus}>
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-5xl font-bold tracking-tighter">
                        ₹ {value}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Amount
                      </div>
                    </div>
                    <Button
                      size="icon"
                      className="shad-button_primary h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(loanInstallmentAmt)}
                      disabled={disabledPlus}>
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
                <DrawerFooter>
                  <Button
                    className="shad-button_primary"
                    onClick={handleGenerate}
                    disabled={loadingGenerate}>
                    {loadingGenerate ? (
                      <div className="flex-center gap-2">
                        <Loader /> Generating...
                      </div>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button className="shad-button_dark_4">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </section>
      </div>
    </>
  );
};

export default UserInfo;
