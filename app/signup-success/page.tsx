import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignupSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto p-6">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-green-600">Compte créé avec succès !</h1>
                    <p className="text-gray-600">
                        Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.
                    </p>
                    <Link href="/login">
                        <Button className="w-full">
                            Se connecter
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
} 