import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const projectId = formData.get('projectId') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const codeProject = formData.get('codeProject') as string

    console.log('Début upload:', {
      projectId,
      title,
      description,
      codeProject,
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size
    })

    if (!file || !projectId || !codeProject) {
      return NextResponse.json(
        { error: 'Fichier, projectId et codeProject requis' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // 1. Upload du fichier
    const fileBuffer = await file.arrayBuffer()
    const fileName = `${Date.now()}-${file.name}`
    const bucketPath = `${projectId}/${fileName}`

    console.log('Upload vers bucket:', `Bennydev.${codeProject}`)

    const { error: storageError } = await supabase.storage
      .from(`Bennydev.${codeProject}`)
      .upload(bucketPath, fileBuffer, {
        contentType: file.type,
        upsert: false
      })

    if (storageError) {
      console.error('Erreur storage:', storageError)
      return NextResponse.json(
        { error: `Erreur lors de l'upload du fichier dans le storage: ${storageError.message}` },
        { status: 500 }
      )
    }

    // 2. Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from(`Bennydev.${codeProject}`)
      .getPublicUrl(bucketPath)

    // 3. Créer l'entrée dans la table files
    const { data: fileData, error: dbError } = await supabase
      .from('files')
      .insert([
        {
          project_id: projectId,
          image_url: publicUrl,
          title: title,
          description: description,
          type: file.type
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Erreur DB:', dbError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement en base de données' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      file: fileData
    })

  } catch (error) {
    console.error('Erreur complète:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    )
  }
} 