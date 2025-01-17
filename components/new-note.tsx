'use client';

import { supabase } from "@/utils/supabase";
import { useState } from "react";

export default function NewNote({ 
    setIsCreating,
    setActiveNoteId,
    fetchNotes
 }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onSave = async () => {
        if (!title || !content) {
            alert('제목과 내용을 입력하세요.')
            return
        }

        const { data, error } = await supabase.from('note')
            .insert({ title, content })
            .select();

        if (error) {
            alert(error.message)
            return
        }

        await fetchNotes();
        setActiveNoteId((data as any[])[0].id);
        setIsCreating(false)
    }

    return (
        <div className="w-2/3 p-2 flex gap-2 flex-col absolute top-0 bottom-0 right-0">
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

            <div className="w-full flex justify-end">
                <button 
                    onClick={() => onSave()} 
                    className="py-2 px-3 rounded-full border border-green-600 hover:border-green-200 transition-all duration-300 ease-in-out"
                >
                    저장
                </button>
            </div>            
        </div>
    )
}