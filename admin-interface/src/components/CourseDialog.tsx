import { useState, useEffect } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Course } from '@/types'

interface CourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course | null
  onSave: (course: Course) => void
}

export function CourseDialog({
  open,
  onOpenChange,
  course,
  onSave,
}: CourseDialogProps) {
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    price: 0,
    courseDate: new Date(),
    teacher: '',
    imageUrl: '',
    location: '',
    category: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (course) {
      setFormData(course)
    } else {
      setFormData({
        title: '',
        price: 0,
        courseDate: new Date(),
        teacher: '',
        imageUrl: '',
        location: '',
        category: '',
      })
    }
  }, [course])

    function isValidUrl(value: string): boolean {
        const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(value);
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}

    if (!formData.imageUrl || !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave({ ...formData, id: course?._id } as Course)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {course ? 'Edit Course' : 'Add New Course'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Course Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.courseDate ? (
                    format(formData.courseDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.courseDate}
                  onSelect={(date) =>
                    setFormData(prev => ({ ...prev, courseDate: date || new Date() }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Input
              id="teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {course ? 'Save Changes' : 'Add Course'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
