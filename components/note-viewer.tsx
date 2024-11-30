'use client';

import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function NoteViewer({ 
    note,
    setActiveNoteId,
    fetchNotes
}) {
    const [title, setTitle] = useState(note?.title)
    const [content, setContent] = useState(note?.content)
    const [isEditing, setIsEditing] = useState(false)

    const onEdit = async () => {
        const { data, error } = await supabase.from('note')
            .update({ title, content })
            .eq('id', note.id);

        if (error) {
            alert(error.message)
            return
        }
        setIsEditing(false)
        fetchNotes()
    }

    const onDelete = async () => {
        const { data, error } = await supabase.from('note')
            .delete()
            .eq('id', note.id);

        if (error) {
            alert(error.message)
            return
        }
        setIsEditing(false)
        setActiveNoteId(null)
        fetchNotes()
    }

    useEffect(() => {
        setTitle(note?.title)
        setContent(note?.content)
        setIsEditing(false)
    }, [note])

    return (
        <div className="w-2/3 p-2 flex gap-2 flex-col absolute top-0 bottom-0 right-0">
            {
                isEditing ? (
                    <>
                        <input 
                            type="text"  
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="border rounded-md border-gray-400 text-xl p-2"
                            placeholder="노트의 제목을 입력하세요."
                        />

                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="border rounded-md border-gray-400 text-lg grow p-2"
                            placeholder="노트의 내용을 입력하세요."
                        />
                    </>
                ) : (
                    <>
                        <h1 className="rounded-md text-lg p-2">{ title }</h1>
                        <p className="rounded-md border-gray-400 text-lg grow p-2">
                            { content }
                        </p>
                    </>                    
                )
            }                    

            <div className="w-full flex justify-end gap-2">
                {
                    isEditing ? (
                        <>
                            <button
                                onClick={() => onEdit()}
                                className="py-2 px-3 rounded-full border border-green-600 hover:border-green-200 transition-all duration-300 ease-in-out"
                            >
                                저장
                            </button>
                            <button 
                                onClick={() => onDelete()}
                                className="py-2 px-3 rounded-full border border-red-600 hover:border-red-200 transition-all duration-300 ease-in-out"
                            >
                                삭제
                            </button>
                        </>                        
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="py-2 px-3 rounded-full border border-green-600 hover:border-green-200 transition-all duration-300 ease-in-out">
                            수정하기
                        </button>
                    )
                }
                
            </div>            
        </div>
    )
}