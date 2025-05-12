"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fileUpload } from "@/app/server-actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"


function submit(e: FormData) {
  console.log(e)

}
export default function ImportData() {
  const form = useForm()
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Import Data</h1>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="configure">Configure Import</TabsTrigger>
          <TabsTrigger value="review">Review & Import</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid grid-cols-2 gap-5">

          
          <Card>
            <CardContent>
              <Form {...form}>
                <form
                  
                  action={fileUpload}
                  className="space-y-8"
                >
                  <FormField
                  control={form.control}
                  name="Data"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Upload Data File</FormLabel>
                    <FormControl>
                      <Input
                      name="data"
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                      }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a CSV, Excel, or JSON file containing your data.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                  )}
                  />
                  <Button type="submit">Submit</Button>
                  <Button className="mx-3" type="reset" variant="outline">Add</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            
          </Card>
          </div>
        </TabsContent>
        

        

        
      </Tabs>
    </div>
  )
}

