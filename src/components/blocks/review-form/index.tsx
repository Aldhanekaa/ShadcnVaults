"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function ReviewForm() {
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !comment) {
      toast.error("Please provide a rating and a comment.")
      return
    }

    setLoading(true)

    // Simulate sending, add your logical here
    setTimeout(() => {
      toast.success("Review submitted successfully!")
      setRating("")
      setComment("")
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Write a Customer Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger id="rating">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Poor</SelectItem>
                <SelectItem value="2">2 - Fair</SelectItem>
                <SelectItem value="3">3 - Good</SelectItem>
                <SelectItem value="4">4 - Very Good</SelectItem>
                <SelectItem value="5">5 - Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
