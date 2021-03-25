import React, {useEffect, useState} from 'react';
import {GoCheck, GoX} from 'react-icons/go';

import api from "../../services/api";

const Teacher = () => {
    const [name, setName] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [editedName, setEditedName] = useState('');

    useEffect(()=>{

        api.get('teachers').then(
            res=>{
                setTeachers(res.data);
            }
        );
    }, [setTeachers, name])

    const clearForm = ()=>{
        setName('');
    }

    const handleSubmit = async e=>{
        e.preventDefault();

       const data = {
            name
        };

        await api.post('teachers', data);

        alert('Dados salvos com sucesso!');

        clearForm();
    }

    const handleDelete = async id =>{
        if(
            window.confirm('Deseja excluir o registro?')
        ){
            try{

                await api.delete(`teachers/${id}`);

                setTeachers(teachers.filter(teacher => teacher.id !== id));
            }catch (e) {
                alert('Erro ao excluir registro!');
            }
        }
    }

    const handleEdit = async id =>{
        const data ={
            id,
            name: editedName
        }

        await api.put(`teachers/${id}`, data)

        alert('Dados editados com sucesso!');
    }



    return (
        <>
            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Cadastro de Professores</legend>
                        <label htmlFor="name">Nome Completo: </label><br/>
                        <input type="text"
                               id="name" name='name'
                               className="field"
                               value={name}
                               onChange={event =>
                               {
                                   setName(event.target.value);
                               }}
                               required
                               placeholder="Digite o nome do Professor"/><br/>
                    </fieldset>
                    <button type="submit">
                        Salvar
                    </button>
                    <button type="reset" onClick={clearForm}>
                        Cancelar
                    </button>
                </form>
            </main>
            <section>
                <ul className="items-grid">
                    {
                        teachers.map(
                            teacher =>(
                                <li key={teacher.id}
                                >
                                       <textarea
                                           className='items-text'
                                           defaultValue={teacher.name}
                                           onChange={
                                               e =>{
                                                   setEditedName(e.target.value);
                                               }
                                           }
                                       />
                                    <div className="items-options">
                                        <div className="options"
                                        title="Salvar"
                                        >
                                            <GoCheck color='green' size={40}
                                                     style={{
                                                         cursor: 'pointer'
                                                     }}
                                                     onClick={()=>
                                                     handleEdit(teacher.id)
                                                     }
                                            />
                                        </div>
                                        <div className="options"
                                             title="Excluir"
                                        >
                                    <GoX color='red' size={40}
                                         style={{
                                             cursor: 'pointer'
                                         }}
                                    onClick={()=>handleDelete(teacher.id)}
                                    />
                                        </div>
                                    </div>
                                </li>
                            )
                        )
                    }
                </ul>
            </section>
        </>
    );
};

export default Teacher;
