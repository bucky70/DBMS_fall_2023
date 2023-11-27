import {Formik} from "formik";
import classes from "./form.module.scss";
import * as yup from "yup";
import SubmitButton from "../component/form/SubmitButton";
import DropDownSelect from "../component/form/DropdownSelect";
import {CITY_STATE} from "../constant/constants";
import FEMultiElementSelect from "../component/form/MultiSelect";

const PopulationDensityForm = ({onFormSubmit}) => {

    const entriesOption = CITY_STATE.map(entry => ({
        label: `${entry.CITY}:${entry.STATE}`,
        value: `${entry.CITY}:${entry.STATE}`
    }));

    const validationSchema = yup.object(
        {
            range: yup.object({
                minYear: yup.number().required(),
                maxYear: yup.number().required(),
            }),
            aggBy: yup.string().required(),
            symbol: yup.array().min(1).required()
        }
    )

    // console.log(entries);

    const initialValue = {
        range: {
            minYear: 2016,
            maxYear: 2022,
        },
        aggBy: 'MONTH',
        symbol: []
    }

    const handleFormSubmit = (value) => {
        const submitValues = {...value, ...value.range};

        submitValues.symbol = submitValues.symbol.map(v => v.value);

        onFormSubmit(submitValues);
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValue} onSubmit={handleFormSubmit}>
            {
                (formik) => {
                    return (
                        <div className={classes.horizontalForm}>
                            <FEMultiElementSelect options={entriesOption} name={"symbol"}/>
                            <DropDownSelect
                                name="wcYears"
                                options={[
                                    { label: "2016", value: 2016 },
                                    { label: "2017", value: 2017 },
                                    { label: "2018", value: 2018 },
                                    { label: "2019", value: 2019 },
                                    { label: "2020", value: 2020 },
                                    { label: "2021", value: 2021 },
                                    { label: "2022", value: 2022 },
                                ]}
                            /> 
                            <SubmitButton formik={formik} />
                            
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default PopulationDensityForm;