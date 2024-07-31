import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// TODO: Implement Book with adding new chapters and editing the book content
// TODO: add collobration feature to the book
// TODO: AItool to create images for the book cover and inside images
// TODO: add voice to text feature to the book
// TODO: Get Approval or Draft the book

const Book = () => {


    const [value, setValue] = useState('');

    return (
        <div className="flex flex-1 overflow-hidden">
            <aside className="hidden w-64 flex-col border-r bg-background p-4 sm:flex">
                <div className="mb-4 text-lg font-medium">Chapters</div>
                <div className="flex-1 overflow-auto">
                </div>
            </aside>
            <ReactQuill value={value} onChange={setValue} className="w-full pb-10 border bottom-2" />
            <aside className="hidden w-64 flex-col border-l bg-background p-4 sm:flex">
                <div className="mb-4 text-lg font-medium">Settings</div>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="book-title">Book Title</Label>
                        <Input id="book-title" placeholder="Enter book title" />
                    </div>
                    <div>
                        <Label htmlFor="book-author">Author</Label>
                        <Input id="book-author" placeholder="Enter author name" />
                    </div>
                    <div>
                        <Label htmlFor="book-genre">Genre</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fiction">Fiction</SelectItem>
                                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                                <SelectItem value="fantasy">Fantasy</SelectItem>
                                <SelectItem value="roance">Romance</SelectItem>
                                <SelectItem value="mystery">Mystery</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="book-description">Description</Label>
                        <Textarea id="book-description" placeholder="Enter book description" />
                    </div>
                    <div>
                        <Button>
                            Save meta data
                        </Button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Book