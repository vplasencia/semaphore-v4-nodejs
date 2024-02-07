import { Group, BigNumberish } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateProof, SemaphoreProof, verifyProof } from "@semaphore-protocol/proof"

async function main() {
    /** Identities */

    /**
     * members are created using the deterministic way so that
     * they can be recreated later using the same secret-message.
     * In this case the secret message is the number i converted to string.
     */

    // array of members to add to the group
    const members: BigNumberish[] = Array.from({ length: 10 }, (_, i) => new Identity(i)).map(
        ({ commitment }) => commitment
    )

    /** Groups */

    // create a group with the members above
    const group = new Group(members)

    /** Proofs */

    // scope to prevent double signaling
    const scope = group.root!

    const message = 1

    // generate the proof
    const proof: SemaphoreProof = await generateProof(new Identity("1"), group, message, scope)

    // verify the proof
    const verified: boolean = await verifyProof(proof)

    console.log("Proof verified: ", verified)
}

main()
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
    .finally(() => process.exit())
