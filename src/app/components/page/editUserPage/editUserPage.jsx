import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backHistoryButton";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { userId } = useParams();
    const { updateUser } = useAuth();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const { getUserById } = useUser();
    const user = getUserById(userId);

    const { professions } = useProfessions();
    const professionList = professions.map(p => ({
        label: p.name,
        value: p._id
    }));

    const { qualities } = useQualities();
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
        return data.map((qual) => qualitiesList.filter((q) => {
            return q.value === qual;
        })[0]);
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            qualitiesArray.push(elem.value);
        }
        return qualitiesArray;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await updateUser({
                ...data,
                qualities: getQualities(data.qualities),
                _id: user._id
            });
            console.log(user._id);
            history.push(`/users/${user._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

    useEffect(() => {
        if (user && qualities.length) {
            setData(() => ({
                name: user.name,
                email: user.email,
                profession: user.profession,
                sex: user.sex,
                qualities: transformData(user.qualities)
            }));
        }
    }, [userId, qualities.length]);

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <>
            <div className="container mt-5">
                <BackHistoryButton />
                {data.name && (
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
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
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditUserPage;
