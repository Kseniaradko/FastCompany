import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backHistoryButton";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getCurrentUserData, updateUser } from "../../../store/users";
import { getProfessions, getProfessonsLoadingStatus } from "../../../store/professions";

const EditUserPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const [errors, setErrors] = useState({});

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessonsLoadingStatus());
    const professionList = professions.map(p => ({
        label: p.name,
        value: p._id
    }));

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map(q => ({
        label: q.name,
        value: q._id,
        color: q.color
    }));

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    const isValid = Object.keys(errors).length === 0;

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const transformData = (data) => {
        if (data) {
            return data.map((qual) => qualitiesList.filter((q) => {
                return q.value === qual;
            })[0]);
        }
    };

    const getQualitiesList = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            qualitiesArray.push(elem.value);
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
         dispatch(updateUser({
            ...data,
            qualities: getQualitiesList(data.qualities)
        }));
        history.push(`/users/${currentUser._id}`);
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData(() => ({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            }));
        }
    }, [currentUser, data, qualitiesLoading, professionsLoading]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <>
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {!isLoading && Object.keys(professions).length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    value={data.email}
                                    name="email"
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберите вашу профессию"
                                    value={data.profession}
                                    options={professionList}
                                    name="profession"
                                    onChange={handleChange}
                                    defaultOption="Choose..."
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    name="sex"
                                    label="Выберите ваш пол"
                                    value={data.sex}
                                    onChange={handleChange}
                                />
                                <MultiSelectField
                                    defaultValue={data.qualities}
                                    options={qualitiesList}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                    onChange={handleChange}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mx-auto"
                                    disabled={!isValid}
                                >
                                    Обновить
                                </button>
                            </form>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUserPage;
