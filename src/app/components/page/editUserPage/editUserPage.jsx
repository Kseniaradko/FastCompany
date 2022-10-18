import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import api from "../../../api";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backHistoryButton";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if ((elem._id || elem.value) === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = user;
        const updatedUser = {
            ...user,
            profession: getProfessionById(profession._id || profession),
            qualities: getQualities(qualities)
        };
        api.users.update(userId, updatedUser).then(() => history.push(`/users/${userId}`));
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

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

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [user]);

    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    if (!user || !professions.length) {
        return "Loading...";
    }

    const choosenProfession = professions.find((item) => item.value === (user.profession._id || user.profession)
    );

    const defaultQualitiesList = user.qualities.map((qual) => {
        return {
            label: qual.name,
            value: qual._id,
            color: qual.color
        };
    });

    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                value={user.email}
                                name="email"
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                value={choosenProfession.value}
                                options={professions}
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
                                value={user.sex}
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                options={qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                                onChange={handleChange}
                                defaultValue={defaultQualitiesList}
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
            </div>
        </>
    );
};

export default EditUserPage;
