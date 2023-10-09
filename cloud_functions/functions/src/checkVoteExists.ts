import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import * as cors from "cors"

const corsHandler = cors({ origin: true })
export const checkVoteExists = functions.https.onRequest(
  (request, response) => {
    corsHandler(request, response, async () => {
      try {
        try {
          const prodeSlug = request.query.prode_slug as string
          const voteId = request.query.vote_id as string

          // Verifica que prodeSlug y voteId estén presentes en la solicitud
          if (!prodeSlug || !voteId) {
            response
              .status(400)
              .send({ error: "Prode slug and vote ID are required." })
            return
          }

          // Referencia al documento
          const docRef = admin
            .firestore()
            .doc(`prodes/${prodeSlug}/votes/${voteId}`)
          const doc = await docRef.get()

          // Si el documento existe, devuelve true, de lo contrario false
          response.send({ exists: doc.exists })
        } catch (error) {
          response.status(500).send({ error: "Internal server error." })
        }
      } catch (error) {
        response.status(500).send({ error: "Cors error." })
      }
    })
  }
)
