import { createClient } from "@supabase/supabase-js";

const key = "sb_publishable_AgzFw9-9lT_PgmnDllcRig_MA3BuQaD"
const url ="https://fzhqzgghgyytjbginpdb.supabase.co"

 const supabase = createClient(url, key);
 
export default function uploadMediaToSupabase(file) {

    return new Promise ((resolve, reject) => {
        if (file == null) {
            reject("No file provided")
        }
        let fileName = file.name;
        const extension = fileName.split('.')[fileName.split('.').length - 1]

       

        const timestamp = new Date().getTime();

        fileName = timestamp + file.name + '.' + extension;

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        })
        .then(()=> {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch((error) => {
            reject(error.message);
        })


})
}