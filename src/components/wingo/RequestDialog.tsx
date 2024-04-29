import {Card} from "@/components/ui/card.tsx";
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {bingoExampleData} from "@/data/bingoExampleData.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";


const RequestDialog = () => {
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Card className="bg-slate-900 hover:bg-[#172033] flex justify-center items-center w-full md:w-64 h-40">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3"
                         stroke="currentColor" className="h-10 w-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
                    </svg>
                </Card>
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Create new request</CredenzaTitle>
                    <CredenzaDescription>
                        Select a teacher and input a quote
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaBody>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="teacher" className="text-right">
                                Teacher
                            </Label>
                            <div id={"teacher"} className={"col-span-3"}>
                                <Select>
                                    <SelectTrigger className="max-w-[400px]">
                                        <SelectValue placeholder="Select a teacher"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {bingoExampleData?.teachers.map((t) => {
                                                return (
                                                    <SelectItem key={t.id} value={t.id}>
                                                        {t.name + " (" + t.shortName + ")"}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quote" className="text-right">
                                Quote
                            </Label>
                            <Input
                                id="quote"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                </CredenzaBody>

                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <button type={"submit"}>Submit request</button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};

export default RequestDialog;