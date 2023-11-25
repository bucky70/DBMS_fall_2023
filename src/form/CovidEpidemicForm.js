import {Formik, useFormik} from "formik";
import MultiSelect from "../component/form/MultiSelect";
import {Fragment, useContext} from "react";
import {StaticDataContext} from "../context/StaticDataContext";
import Multirangeslider from "multi-range-slider-react";
import classes from "./form.module.scss";
import RadioGroup from "../component/form/RadioGroup";
import * as yup from "yup";
import FEMultiElementSelect from "../component/form/MultiSelect";
import RangeSlider from "../component/form/RangeSlider";
import SubmitButton from "../component/form/SubmitButton";
import DropDownSelect from "../component/form/DropdownSelect";
import {CITY_STATE} from "../constant/constants";

const CovidEpidemicForm = ({onFormSubmit}) => {

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
        // Spread out the range object.
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
                            {/*<div className={classes.formElement}>*/}
                            {/*    <MultiSelect value={formik.values.symbol}*/}
                            {/*                 setValue={(newValues) => formik.setFieldValue("symbol", newValues)}*/}
                            {/*                 options={entriesOption}/>*/}
                            {/*</div>*/}

                            { /* <DropDownSelect
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
                            /> */}
                            <SubmitButton formik={formik} />
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default CovidEpidemicForm;