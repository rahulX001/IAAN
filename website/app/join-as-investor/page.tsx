"use client"

import { FormEvent } from "react"
import WizardLayout from "@/layout/WizardLayout"
import { FormValues, investorFormSchema } from "@/schema/investorFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormProvider, useForm } from "react-hook-form"

import { useMultiStepForm } from "@/hooks/useMultiStepForm"
import { Button } from "@/components/ui/button"
import InvestorForm from "@/components/InvestorForm"
import UserLoginForm from "@/components/UserLoginForm"
import UserRegisterForm from "@/components/UserRegisterForm"

function Page() {
  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <InvestorForm />,
      <UserLoginForm />,
      <UserRegisterForm />,
    ])

  const form = useForm<FormValues>({
    resolver: zodResolver(investorFormSchema),
    mode: "onBlur",
    defaultValues: {
      gender: "male",
      commitment: "5L",
    },
  })

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    next()
  }
  return (
    <>
      <WizardLayout currentStep={currentStepIndex + 1} maxSteps={steps.length}>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            {step}
            <div className={"mt-1.5 flex justify-end gap-2"}>
              <Button disabled={isFirstStep} onClick={back}>
                Back
              </Button>
              <Button type={"submit"}> {isLastStep ? "Submit" : "Next"}</Button>
            </div>
          </form>
        </FormProvider>
      </WizardLayout>
    </>
  )
}
export default Page
