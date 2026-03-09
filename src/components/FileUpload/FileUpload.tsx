import { Tooltip } from "@mui/material";
import type { ChangeEvent } from "react";

interface FileUploadProps {
  setChallengeWords: (words: string[]) => void;
}

export const FileUpload = ({setChallengeWords}:FileUploadProps) => {

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file){
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target?.result;
            if(typeof text === "string"){
                text.replace(/[,:;!?'"“”\-]/g, " ");
                const words = text
                    .split(" ")
                    .map(word => word.replace(/[.,:;!?'"“”\-]/g, " "))
                    .map(word => word.trim())
                    .filter(word => word.length > 0);
                    setChallengeWords(words);
                 console.log("Uploaded words:", words);
            }
        }

        reader.readAsText(file);
    }

    return(
        <>
            <input data-testid="file-input" type="file" accept=".txt" id="fileUpload" onChange={handleUpload} style={{ display: "none"}} />
            <Tooltip title="Upload Words (.txt)" arrow>
                <label 
                    htmlFor="fileUpload" 
                    style={{ 
                        position: "fixed", 
                        bottom: 0, 
                        right: 0, 
                        margin: "10px", 
                        width: "80px", 
                        height: "80px",  
                        background: "transparent",
                        border: " solid white",
                        borderRadius: "10px",
                        alignContent: "center",
                        fontSize: "30px"
                }}>+</label>
            </Tooltip>
        </>
    );
}
