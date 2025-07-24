'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { useNewsletter } from '@/hooks/use-newsletter'

export default function UnsubscribePage() {
	const [email, setEmail] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)
	const { unsubscribe, isLoading, error } = useNewsletter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!email.trim()) return

		const result = await unsubscribe(email.trim())

		if (result.success) {
			setIsSuccess(true)
			setEmail('')
		}
	}

	if (isSuccess) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-md mx-auto">
					<Card>
						<CardContent className="pt-6">
							<div className="text-center space-y-4">
								<CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
								<div>
									<h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
										Successfully Unsubscribed
									</h1>
									<p className="text-muted-foreground mt-2">
										You have been removed from our newsletter. We&apos;re sorry to see you go!
									</p>
								</div>
								<div className="space-y-2">
									<Button 
										variant="outline" 
										onClick={() => setIsSuccess(false)}
										className="w-full"
									>
										Unsubscribe Another Email
									</Button>
									<Button 
										asChild
										variant="ghost"
										className="w-full"
									>
										<Link href="/">Return to Homepage</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-md mx-auto">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Mail className="h-5 w-5" />
							Unsubscribe from Newsletter
						</CardTitle>
						<CardDescription>
							Enter your email address to unsubscribe from our newsletter.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									placeholder="your.email@example.com"
									value={email}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
									required
									disabled={isLoading}
								/>
							</div>

							<Button 
								type="submit" 
								className="w-full" 
								disabled={isLoading || !email.trim()}
								variant="destructive"
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Unsubscribing...
									</>
								) : (
									'Unsubscribe'
								)}
							</Button>
						</form>

						<div className="text-center">
							<p className="text-sm text-muted-foreground mb-2">
								Changed your mind?
							</p>
							<Button asChild variant="ghost" size="sm">
								<Link href="/">Return to Homepage</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
