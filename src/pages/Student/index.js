import React, {useEffect, useState} from 'react';

import "./styles.css"
import api from "../../services/api";
import {GoPencil, GoX} from "react-icons/go";
import {Link, useHistory, useParams} from "react-router-dom";

const Student = () => {
    const [teachers, setTeachers]  = useState([]);
    const [name, setName] = useState('');
    const [theme, setTheme] = useState('');
    const [students, setStudents] = useState([]);

    const [selectTeacher, setSelectedTeacher] = useState('0');

    const params = useParams();

    const data = {
        name,
        theme,
        'teacherId': Number(selectTeacher),
    }

    const hist = useHistory();

    useEffect(()=>{
        if(params.id){
            api.get(`students/${params.id}`).then(
                res=>{
                    setName(res.data.name);
                    setTheme(res.data.theme);
                    setSelectedTeacher(res.data.teacherId);
                }
            )
        }
    }, [params.id]);

    useEffect(()=>{
        api.get('students?_expand=teacher').then(
            res =>{
                setStudents(res.data);
            }
        )
    }, [setStudents, name])

    useEffect(()=>{
        api.get('teachers').then(
            res=>{
                setTeachers(res.data);
            }
        );
    }, []);

    const handleSubmit = async e=>{
        e.preventDefault();

        if(selectTeacher==="0"){
            alert('Selecione um professor!');
            return 0;
        }

        try{
            if(!params.id){
                await api.post('students', data);
            }else{
                await api.put(`students/${params.id}`, data);
            }
            alert('Dados salvos com sucesso!');
        }catch (e) {
            alert("Erro ao Salvar Dados!\n" + e);
        }finally {
            clearForm();
            hist.push('/students');
        }

    }

    const clearForm = ()=>{
        setSelectedTeacher('0');
        setName('');
        setTheme('');
    }

    const handleDelete = async id =>{
        if(
            window.confirm('Deseja excluir o registro?')
        ){
            try{

                await api.delete(`students/${id}`);

                setStudents(students.filter(s => s.id !== id));
            }catch (e) {
                alert('Erro ao excluir registro!');
            }
        }
    }

    return (
<>
        <main>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                        Cadastro de Alunos
                    </legend>
                    <label htmlFor="name">Nome Completo: </label><br/>
                    <input type="text" id="name" name='name' className="field"
                           placeholder="Digite seu Nome"
                           value={name}
                           onChange={e =>{
                               setName(e.target.value)
                           }}
                           required
                    /><br/>
                    <label htmlFor="theme">Tema: </label><br/>
                    <input type="text"
                           name="theme"
                           id="theme"
                           className="field"
                           placeholder="Digite seu Tema"
                           value={theme}
                           required
                    onChange={event => {
                        setTheme(event.target.value);
                    }}
                    /><br/>
                    <label htmlFor="orientador">Professor Orientador: </label><br/>
                    <select name="orientador" id="orientador" className="field"
                            value={selectTeacher}
                            onChange={
                                e=> {
                                    setSelectedTeacher(e.target.value);
                                }
                    }>
                        <option value="0">Selecione um Professor</option>
                        {
                            teachers.map(
                                teacher=>(
                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                )
                            )
                        }
                    </select><br/>
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
               students.map(
                   student =>(
                       <li key={student.id}>
                           <div className="items-details">
                               <small>
                                   Nome:
                               </small>
                           <textarea
                               disabled
                               className='items-text'
                               defaultValue={student.name}
                           />
                           </div>
                           <div className="items-details">
                               <small>
                                   Tema:
                               </small>
                               <textarea
                                   disabled
                                   className='items-text'
                                   defaultValue={student.theme}
                               />
                           </div>
                           <div className="items-details">
                               <small>
                                   Orientador:
                               </small>
                               <textarea
                                   disabled
                                   className='items-text'
                                   defaultValue={student.teacher.name}
                               />
                           </div>
                           <div className="items-options">
                               <div className="options" title="Editar">
                                   <Link to={`/students/${student.id}`}>
                                   <GoPencil color='grey' size={40}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                   />
                                   </Link>
                               </div>
                               <div className="options" title="Excluir">
                                   <GoX color='red' size={40}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={()=>handleDelete(student.id)}
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

export default Student;
