import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <Link href="/">
                <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Πίσω στη Gallery
                </Button>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                <div className="md:col-span-1">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a]">
                        <img src="/about-photo.jpg" alt="Όλια Ντακογιάννη" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">
                    <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Σχετικά με εμένα</h1>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Είμαι η Όλια Ντακογιάννη,{" "}
                        <strong className="text-black dark:text-white">αρχαιολόγος, μουσειοπαιδαγωγός και δημιουργός κόμικς</strong>,
                        με ιδιαίτερο ενδιαφέρον για την{" "}
                        <strong className="text-black dark:text-white">αφήγηση</strong>, την{" "}
                        <strong className="text-black dark:text-white">εικονογράφηση</strong> και τη
                        σύνδεση της αρχαιολογίας με τη σύγχρονη{" "}
                        <strong className="text-black dark:text-white">οπτική επικοινωνία</strong>. Από το
                        2017 δραστηριοποιούμαι επαγγελματικά στον χώρο των κόμικς. Παράλληλα, έχω
                        συνεργαστεί με πολιτιστικούς και εκπαιδευτικούς φορείς, όπως το{" "}
                        <strong className="text-black dark:text-white">Μουσείο Κυκλαδικής Τέχνης</strong>,
                        συμμετέχοντας στον σχεδιασμό{" "}
                        <strong className="text-black dark:text-white">εκπαιδευτικών προγραμμάτων και εργαστηρίων</strong>.
                        Μέσα από τη συνεργασία μου με την{" "}
                        <strong className="text-black dark:text-white">Athens Comics Library</strong>,
                        πραγματοποιώ επίσης εργαστήρια storytelling με όχημα τα κόμικς, εξερευνώντας τις
                        δυνατότητες της εικόνας και της αφήγησης ως εργαλείων έκφρασης και μάθησης.
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Σήμερα συνεχίζω την ακαδημαϊκή μου πορεία στο Πανεπιστήμιο Δυτικής Μακεδονίας,
                        στο πεδίο της{" "}
                        <strong className="text-black dark:text-white">Δημιουργικής Γραφής</strong> και
                        της <strong className="text-black dark:text-white">Λογοτεχνικής Συγγραφής</strong>.
                        Στη δουλειά μου με ενδιαφέρει ιδιαίτερα η μετατροπή του ερευνητικού μου πεδίου σε{" "}
                        <strong className="text-black dark:text-white">ζωντανές, οπτικές αφηγήσεις</strong>,
                        καθώς και η δημιουργία{" "}
                        <strong className="text-black dark:text-white">ανθρωποκεντρικών ιστοριών</strong>{" "}
                        που απευθύνονται σε{" "}
                        <strong className="text-black dark:text-white">όλες τις ηλικίες</strong>.
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Όταν δεν σχεδιάζω ή γράφω, διαβάζω λογοτεχνικά βιβλία, πηγαίνω στο θέατρο ή τον
                        κινηματογράφο, ακούω τζαζ μουσική ή μελετάω τρομπέτα.
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Σε αυτή τη σελίδα μπορείς να γνωρίσεις εμένα και τη δουλειά μου και ίσως προκύψει
                        μια ενδιαφέρουσα{" "}
                        <strong className="text-black dark:text-white">συνεργασία</strong>!
                    </p>
                </div>
            </div>
        </div>
    );
}