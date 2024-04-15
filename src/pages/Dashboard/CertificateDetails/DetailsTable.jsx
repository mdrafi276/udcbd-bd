/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getCertificateTypeById, getUnionNameById } from "../../../api/certificates";

const DetailsTable = ({ certificate }) => {
    const { data: unionName } = useQuery({
        queryKey: ["unionName", certificate],
        queryFn: async () => getUnionNameById(certificate?.id),
    });

    const { data: sanadType } = useQuery({
        queryKey: ["sanad_type", certificate],
        queryFn: async () => await getCertificateTypeById(certificate?.sanad_id),
    });

    console.log(certificate);

    const Row = ({ bnKey, enKey, value }) => {
        return (
            <tr className="even:bg-blue-gray-50/50 bg-white">
                <td className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="text-center">
                        {!!certificate?.language || certificate?.language === "en"
                            ? enKey
                            : bnKey}
                    </Typography>
                </td>

                <td className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="text-center">
                        {value || "N/A"}
                    </Typography>
                </td>
            </tr>
        );
    };

    return (
        <div className="rounded-lg shadow-lg max-w-screen-lg mx-auto mt-20">
            <table className="w-full">
                <tbody>
                    <Row bnKey="নাম" enKey="Name" value={certificate?.applicant} />
                    <Row
                        bnKey="সনদের ধরণ"
                        enKey="Certificate Type"
                        value={sanadType?.description}
                    />
                    <Row
                        bnKey="ট্রাককিং নম্বর"
                        enKey="Tracking Number"
                        value={certificate?.id}
                    />

                    <Row
                        bnKey="ওয়ার্ড নম্বর"
                        enKey="Ward Number"
                        value={certificate?.applicant}
                    />

                    <Row
                        bnKey="ইউনিয়ন"
                        enKey="Union"
                        value={
                            certificate?.language === "en" || !!certificate?.language
                                ? unionName?.name
                                : unionName?.bn_name
                        }
                    />

                    <Row
                        bnKey={certificate?.husband ? "স্বামী" : "পিতা"}
                        enKey={certificate?.husband ? "Husband" : "Father"}
                        value={certificate?.father_husband_name || certificate?.husband}
                    />

                    <Row
                        bnKey="আবেদনের তারিখ"
                        enKey="Applied Date"
                        value={certificate?.date}
                    />
                </tbody>
            </table>
        </div>
    );
};

export default DetailsTable;
