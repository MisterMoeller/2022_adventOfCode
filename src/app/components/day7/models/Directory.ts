import {File} from "./File"

export class Directory {
  sizeIncludingSubfolders: number = 0;

  constructor(public name: string,
              public files: File[],
              public parentDirectory: Directory,
              public subdirectories: Directory[]) {
  }

  private getSizeOfThisDirectoryOnly() {
    return this.files.map(file => file.size).reduce((prev, cur) => prev + cur, 0);
  }

  private getSizeOfSubdirectories() {
    let totalSize = 0;
    for (let subdirectory of this.subdirectories) {
      totalSize += subdirectory.getSizeIncludingSubDiretories();
    }
    return totalSize;
  }

  public getSizeIncludingSubDiretories() {
    return this.getSizeOfThisDirectoryOnly() + this.getSizeOfSubdirectories();
  }

  hasSubfolderWithName(name: string): boolean {
    return this.subdirectories.map(dir => dir.name).includes(name);
  }

  hasFile(filename: string): boolean {
    return this.files.map(file => file.fileName).includes(filename);
  }

  addSubdirectory(name: string) {
    const newDirectory = new Directory(name, [], this, []);
    this.subdirectories.push(newDirectory);
    return newDirectory;
  }

  addFile(file: File) {
    this.files.push(file);
  }
}
