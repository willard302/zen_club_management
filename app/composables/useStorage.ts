export const useStorage = () => {

  const client = useSupabaseClient();
  
  const uploadFile = async(
    file: File, 
    bucketName: string 
  ): Promise<string | null> => {
    if (!file) throw "No file select";

    const filePath = `${Date.now()}-${file.name}`

    const { data, error } = await client.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw `Upload error: ${error.message}`

    const { data: publicUrlData } = client.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  };

  return {
    uploadFile
  }

}
