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
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {container} from "tsyringe";
import {TeacherData} from "@/data/TeacherData.ts";
import {useSubscribe} from "@/hooks/useSubscribe.ts";
import {addRequest} from "@/api/apiClient.ts";
import {useState} from "react";


const RequestDialog = () => {
    const teacherData = container.resolve(TeacherData)
    const teachers = useSubscribe(teacherData.teachers)

    const [quote, setQuote] = useState<string>("")
    const [teacherId, setTeacherId] = useState<string>()

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Card className="bg-fill-secondary hover:bg-[#172033] flex justify-center items-center w-full md:w-64">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3"
                         stroke="currentColor" className="h-10 w-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
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
                                <Select onValueChange={(v) => setTeacherId(v)}>
                                    <SelectTrigger className="max-w-[400px]">
                                        <SelectValue placeholder="Select a teacher"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/*remove forece unpack*/}
                                            {teachers && teachers!.map((t) => {
                                                return (
                                                    <SelectItem key={t.teacherId} value={t.teacherId}>
                                                        {t.name + " (" + t.shortHand + ")"}
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
                                onChange={(v) => setQuote(v.target.value)}
                            />
                        </div>
                    </div>
                </CredenzaBody>

                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <button type={"submit"} onClick={() => {
                            addRequest(teachers!.find(t => t.teacherId === teacherId)!, quote)
                        }}>Submit request</button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};

export default RequestDialog;