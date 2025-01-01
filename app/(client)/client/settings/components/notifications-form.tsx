"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../../components/ui/form"
import { Switch } from "../../../../../components/ui/switch"
import { Badge } from "@/components/ui/badge"

const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
})

type NotificationFormValues = z.infer<typeof notificationFormSchema>

export function NotificationForm() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
    },
  })

  function onSubmit(data: NotificationFormValues) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Notifications par email</FormLabel>
                <FormDescription>
                  Recevez des notifications par email pour les mises à jour importantes.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pushNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Notifications push</FormLabel>
                <FormDescription>
                  Recevez des notifications push sur votre appareil.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="smsNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <FormLabel className="text-base text-muted-foreground">Notifications SMS</FormLabel>
                  <Badge variant="secondary">Bientôt disponible</Badge>
                </div>
                <FormDescription className="text-muted-foreground">
                  Recevez des notifications par SMS.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={false}
                  onCheckedChange={field.onChange}
                  disabled={true}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Enregistrer les préférences</Button>
      </form>
    </Form>
  )
}