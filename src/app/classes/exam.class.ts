export class Exam {
    public readonly id: number;
    public readonly studentId: number;
    public readonly year: number;
    public readonly name: string = '';
    public readonly gradeType: string;
    public readonly grade: number;
    public readonly date: Date = new Date();

    public toString(): string {
        return `${name}, ${this.gradeType} ${this.grade}, ${this.date.toDateString()}`;
    }
}
